using System.Runtime.Serialization;
using Umbraco.Cms.Core.Models.Entities;

namespace Umbraco.Cms.Core.Models;

/// <summary>
///     Represents a member type
/// </summary>
[Serializable]
[DataContract(IsReference = true)]
public class MemberGroup : EntityBase, IMemberGroup
{
    private int _creatorId;
    private string? _name;

    [DataMember]
    public string? Name
    {
        get => _name;
<<<<<<< HEAD
        set
        {
            if (_name != value)
            {
                // if the name has changed, add the value to the additional data,
                // this is required purely for event handlers to know the previous name of the group
                // so we can keep the public access up to date.
                AdditionalData[Constants.Entities.AdditionalDataKeys.MemberGroupPreviousName] = _name;
            }

            SetPropertyValueAndDetectChanges(value, ref _name, nameof(Name));
        }
=======
        set => SetPropertyValueAndDetectChanges(value, ref _name, nameof(Name));
>>>>>>> v10/contrib_Merge20251106_Try
    }

    [DataMember]
    public int CreatorId
    {
        get => _creatorId;
        set => SetPropertyValueAndDetectChanges(value, ref _creatorId, nameof(CreatorId));
    }
}
