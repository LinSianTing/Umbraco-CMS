/**
* @ngdoc directive
* @name umbraco.directives.directive:umbTree
* @restrict E
**/
function umbTreeDirective($compile, $log, $q, $rootScope, treeService, notificationsService, $timeout, userService) {

    return {
        restrict: 'E',
        replace: true,
        terminal: false,

        scope: {
            section: '@',
            treealias: '@',
            hideoptions: '@',
            hideheader: '@',
            cachekey: '@',
            isdialog: '@',
            onlyinitialized: '@',
            //Custom query string arguments to pass in to the tree as a string, example: "startnodeid=123&something=value"
            customtreeparams: '@',
            enablecheckboxes: '@',
            enablelistviewsearch: '@',
            enablelistviewexpand: '@',

            api: '=?',
            onInit: '&?'
        },

        compile: function (element, attrs) {
            //config
            //var showheader = (attrs.showheader !== 'false');
            var hideoptions = (attrs.hideoptions === 'true') ? "hide-options" : "";
            var template = '<ul class="umb-tree ' + hideoptions + '"><li class="root">';
            template += '<div data-element="tree-root" ng-class="getNodeCssClass(tree.root)" ng-hide="hideheader" on-right-click="altSelect(tree.root, $event)">' +
                '<h5>' +
                '<a href="#/{{section}}" ng-click="select(tree.root, $event)"  class="root-link"><i ng-if="enablecheckboxes == \'true\'" ng-class="selectEnabledNodeClass(tree.root)"></i> {{tree.name}}</a></h5>' +
                '<a data-element="tree-item-options" class="umb-options" ng-hide="tree.root.isContainer || !tree.root.menuUrl" ng-click="options(tree.root, $event)" ng-swipe-right="options(tree.root, $event)"><i></i><i></i><i></i></a>' +
                '</div>';
            template += '<ul>' +
                '<umb-tree-item ng-repeat="child in tree.root.children" enablelistviewexpand="{{enablelistviewexpand}}" node="child" current-node="currentNode" tree="this" section="{{section}}" ng-animate="animation()"></umb-tree-item>' +
                '</ul>' +
                '</li>' +
                '</ul>';

            element.replaceWith(template);

            return function (scope, elem, attr, controller) {

            };
        },

        controller: function ($scope) {

            var vm = this;

            var registeredCallbacks = {
                treeNodeExpanded: [],
                treeNodeSelect: [],
                treeLoaded: [],
                treeSynced: [],
                treeOptionsClick: [],
                treeNodeAltSelect: []
            };
            
            //this is the API exposed by this directive, for either hosting controllers or for other directives
            vm.callbacks = {
                treeNodeExpanded: function (f) {
                    registeredCallbacks.treeNodeExpanded.push(f);
                },
                treeNodeSelect: function (f) {
                    registeredCallbacks.treeNodeSelect.push(f);
                },
                treeLoaded: function (f) {
                    registeredCallbacks.treeLoaded.push(f);
                },
                treeSynced: function (f) {
                    registeredCallbacks.treeSynced.push(f);
                },
                treeOptionsClick: function (f) {
                    registeredCallbacks.treeOptionsClick.push(f);
                },
                treeNodeAltSelect: function (f) {
                    registeredCallbacks.treeNodeAltSelect.push(f);
                }
            };
            vm.emitEvent = emitEvent;
            vm.load = load;
            vm.reloadNode = reloadNode;
            vm.syncTree = syncTree;

            //wire up the exposed api object for hosting controllers
            if ($scope.api) {
                $scope.api.callbacks = vm.callbacks;
                $scope.api.load = vm.load;
                $scope.api.reloadNode = vm.reloadNode;
                $scope.api.syncTree = vm.syncTree;
            }

            //flag to track the last loaded section when the tree 'un-loads'. We use this to determine if we should
            // re-load the tree again. For example, if we hover over 'content' the content tree is shown. Then we hover
            // outside of the tree and the tree 'un-loads'. When we re-hover over 'content', we don't want to re-load the
            // entire tree again since we already still have it in memory. Of course if the section is different we will
            // reload it. This saves a lot on processing if someone is navigating in and out of the same section many times
            // since it saves on data retreival and DOM processing.
            var lastSection = "";
            
            //flag to enable/disable delete animations
            var deleteAnimations = false;

            /** Helper function to emit tree events */
            function emitEvent(eventName, args) {
                if (registeredCallbacks[eventName] && angular.isArray(registeredCallbacks[eventName])) {
                    _.each(registeredCallbacks[eventName], function (c) {
                        c(args);//call it
                    });
                }
            }

            /** This will deleteAnimations to true after the current digest */
            function enableDeleteAnimations() {
                //do timeout so that it re-enables them after this digest
                $timeout(function () {
                    //enable delete animations
                    deleteAnimations = true;
                }, 0, false);
            }

            function clearCache(section) {
                treeService.clearCache({ section: section });
            }

            function load(section) {
                $scope.section = section;
                return loadTree();
            }

            function reloadNode(node) {

                if (!node) {
                    node = $scope.currentNode;
                }

                if (node) {
                    return $scope.loadChildren(node, true);
                }

                return $q.reject();
            }

            /**
             * Used to do the tree syncing
             * @param {any} args
             * @returns a promise with an object containing 'node' and 'activate'
             */
            function syncTree(args) {
                if (!args) {
                    throw "args cannot be null";
                }
                if (!args.path) {
                    throw "args.path cannot be null";
                }
                                
                var treeNode = loadActiveTree(args.tree);

                if (angular.isString(args.path)) {
                    args.path = args.path.replace('"', '').split(',');
                }

                //Filter the path for root node ids (we don't want to pass in -1 or 'init')

                args.path = _.filter(args.path, function (item) { return (item !== "init" && item !== "-1"); });

                //Once those are filtered we need to check if the current user has a special start node id,
                // if they do, then we're going to trim the start of the array for anything found from that start node
                // and previous so that the tree syncs properly. The tree syncs from the top down and if there are parts
                // of the tree's path in there that don't actually exist in the dom/model then syncing will not work.

                return userService.getCurrentUser().then(function (userData) {

                    var startNodes = [];
                    for (var i = 0; i < userData.startContentIds; i++) {
                        startNodes.push(userData.startContentIds[i]);
                    }
                    for (var j = 0; j < userData.startMediaIds; j++) {
                        startNodes.push(userData.startMediaIds[j]);
                    }

                    _.each(startNodes, function (i) {
                        var found = _.find(args.path, function (p) {
                            return String(p) === String(i);
                        });
                        if (found) {
                            args.path = args.path.splice(_.indexOf(args.path, found));
                        }
                    });

                    deleteAnimations = false;

                    return treeService.syncTree({
                        node: treeNode,
                        path: args.path,
                        forceReload: args.forceReload
                    }).then(function (data) {

                        if (args.activate === undefined || args.activate === true) {
                            $scope.currentNode = data;
                        }

                        emitEvent("treeSynced", { node: data, activate: args.activate });

                        enableDeleteAnimations();

                        return $q.when({ node: data, activate: args.activate });
                    });
                });
                
            }

            //given a tree alias, this will search the current section tree for the specified tree alias and set the current active tree to it's root node
            function loadActiveTree(treeAlias) {
                
                if (!$scope.tree) {
                    throw "Err in umbtree.directive.loadActiveTree, $scope.tree is null";
                }

                //if its not specified, it should have been specified before
                if (!treeAlias) {
                    if (!$scope.activeTree) {
                        throw "Err in umbtree.directive.loadActiveTree, $scope.activeTree is null";
                    }
                    return $scope.activeTree;
                }

                var childrenAndSelf = [$scope.tree.root].concat($scope.tree.root.children);
                $scope.activeTree = _.find(childrenAndSelf, function (node) {
                    if (node && node.metaData && node.metaData.treeAlias) {
                        return node.metaData.treeAlias.toUpperCase() === treeAlias.toUpperCase();
                    }
                    return false;
                });

                if (!$scope.activeTree) {
                    throw "Could not find the tree " + treeAlias;
                }

                emitEvent("activeTreeLoaded", { tree: $scope.activeTree });

                return $scope.activeTree;
            }

            /** Method to load in the tree data */

            function loadTree() {
                if (!$scope.loading && $scope.section) {
                    $scope.loading = true;

                    //anytime we want to load the tree we need to disable the delete animations
                    deleteAnimations = false;

                    //default args
                    var args = { section: $scope.section, tree: $scope.treealias, cacheKey: $scope.cachekey, isDialog: $scope.isdialog ? $scope.isdialog : false, onlyinitialized: $scope.onlyinitialized };

                    //add the extra query string params if specified
                    if ($scope.customtreeparams) {
                        args["queryString"] = $scope.customtreeparams;
                    }

                    return treeService.getTree(args)
                        .then(function (data) {
                            //set the data once we have it
                            $scope.tree = data;

                            enableDeleteAnimations();

                            $scope.loading = false;

                            //set the root as the current active tree
                            $scope.activeTree = $scope.tree.root;

                            emitEvent("treeLoaded", { tree: $scope.tree });
                            emitEvent("treeNodeExpanded", { tree: $scope.tree, node: $scope.tree.root, children: $scope.tree.root.children });
                            return $q.when(data);
                        }, function (reason) {
                            $scope.loading = false;
                            notificationsService.error("Tree Error", reason);
                            return $q.reject(reason);
                        });
                }
                else {
                    return $q.reject();
                }
            }

            /** Returns the css classses assigned to the node (div element) */
            $scope.getNodeCssClass = function (node) {
                if (!node) {
                    return '';
                }

                //TODO: This is called constantly because as a method in a template it's re-evaluated pretty much all the time
                // it would be better if we could cache the processing. The problem is that some of these things are dynamic.

                var css = [];
                if (node.cssClasses) {
                    _.each(node.cssClasses, function (c) {
                        css.push(c);
                    });
                }

                return css.join(" ");
            };

            $scope.selectEnabledNodeClass = function (node) {
                return node ?
                    node.selected ?
                        'icon umb-tree-icon sprTree icon-check green temporary' :
                        '' :
                    '';
            };

            /** method to set the current animation for the node.
             *  This changes dynamically based on if we are changing sections or just loading normal tree data.
             *  When changing sections we don't want all of the tree-ndoes to do their 'leave' animations.
             */
            $scope.animation = function () {
                if (deleteAnimations && $scope.tree && $scope.tree.root && $scope.tree.root.expanded) {
                    return { leave: 'tree-node-delete-leave' };
                }
                else {
                    return {};
                }
            };

            /* helper to force reloading children of a tree node */
            $scope.loadChildren = function (node, forceReload) {

                //emit treeNodeExpanding event, if a callback object is set on the tree
                emitEvent("treeNodeExpanding", { tree: $scope.tree, node: node });

                //standardising
                if (!node.children) {
                    node.children = [];
                }

                if (forceReload || (node.hasChildren && node.children.length === 0)) {
                    //get the children from the tree service
                    return treeService.loadNodeChildren({ node: node, section: $scope.section })
                        .then(function (data) {
                            //emit expanded event
                            emitEvent("treeNodeExpanded", { tree: $scope.tree, node: node, children: data });

                            enableDeleteAnimations();

                            return $q.when(data);
                        });
                }
                else {
                    emitEvent("treeNodeExpanded", { tree: $scope.tree, node: node, children: node.children });
                    node.expanded = true;

                    enableDeleteAnimations();

                    return $q.when(node.children);
                }
            };

            /**
              Method called when the options button next to the root node is called.
              The tree doesnt know about this, so it raises an event to tell the parent controller
              about it.
            */
            $scope.options = function (n, ev) {
                emitEvent("treeOptionsClick", { element: elem, node: n, event: ev });
            };

            /**
              Method called when an item is clicked in the tree, this passes the
              DOM element, the tree node object and the original click
              and emits it as a treeNodeSelect element if there is a callback object
              defined on the tree
            */
            $scope.select = function (n, ev) {

                if (n.metaData && n.metaData.noAccess === true) {
                    ev.preventDefault();
                    return;
                }

                //on tree select we need to remove the current node -
                // whoever handles this will need to make sure the correct node is selected
                //reset current node selection
                $scope.currentNode = null;

                emitEvent("treeNodeSelect", { element: elem, node: n, event: ev });
            };

            $scope.altSelect = function (n, ev) {
                emitEvent("treeNodeAltSelect", { element: elem, tree: $scope.tree, node: n, event: ev });
            };

            //watch for section changes
            $scope.$watch("section", function (newVal, oldVal) {

                if (!$scope.tree) {
                    loadTree();
                }

                if (!newVal) {
                    //store the last section loaded
                    lastSection = oldVal;
                }
                else if (newVal !== oldVal && newVal !== lastSection) {
                    //only reload the tree data and Dom if the newval is different from the old one
                    // and if the last section loaded is different from the requested one.
                    loadTree();

                    //store the new section to be loaded as the last section
                    //clear any active trees to reset lookups
                    lastSection = newVal;
                }
            });

            //call the callback, this allows for hosting controllers to bind to events and use the exposed API
            $scope.onInit();
            
            loadTree();
        }
    };
}

angular.module("umbraco.directives").directive('umbTree', umbTreeDirective);
