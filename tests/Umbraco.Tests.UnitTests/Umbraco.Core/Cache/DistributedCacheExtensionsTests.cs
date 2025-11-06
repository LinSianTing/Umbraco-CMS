// Copyright (c) Umbraco.
// See LICENSE for more details.

using NUnit.Framework;
using Umbraco.Cms.Core.Models;
<<<<<<< HEAD
=======
using Umbraco.Cms.Core.Notifications;
>>>>>>> v10/contrib_Merge20251106_Try
using Umbraco.Cms.Tests.Common.Builders;
using Umbraco.Cms.Tests.Common.Builders.Extensions;
using Umbraco.Extensions;

namespace Umbraco.Cms.Tests.UnitTests.Umbraco.Core.Cache;

[TestFixture]
public class DistributedCacheExtensionsTests
{
<<<<<<< HEAD
    [Test]
    public void Member_GetPayloads_CorrectlyCreatesPayloads()
    {
        var members = new List<IMember>()
        {
            CreateMember(1, "Fred", "fred", "fred@test.com"),
            CreateMember(1, "Fred", "fred", "fred@test.com"),
            CreateMember(2, "Sally", "sally", "sally@test.com"),
            CreateMember(3, "Jane", "jane", "jane@test.com", "janeold"),
        };

        var payloads = DistributedCacheExtensions.GetPayloads(members, false);
=======
    [TestCase(true)]
    [TestCase(false)]
    public void Member_GetPayloads_CorrectlyCreatesPayloads(bool removed)
    {
        var member1Key = Guid.NewGuid();
        var member2Key = Guid.NewGuid();
        var member3Key = Guid.NewGuid();
        var members = new List<IMember>()
        {
            CreateMember(1, member1Key, "Fred", "fred", "fred@test.com"),
            CreateMember(1, member1Key, "Fred", "fred", "fred@test.com"),
            CreateMember(2, member2Key, "Sally", "sally", "sally@test.com"),
            CreateMember(3, member3Key, "Jane", "jane", "jane@test.com"),
        };

        var state = new Dictionary<string, object>
        {
            {
                MemberSavedNotification.PreviousUsernameStateKey,
                new Dictionary<Guid, string> { { member3Key, "janeold" } }
            },
        };

        var payloads = DistributedCacheExtensions.GetPayloads(members, state, removed);
>>>>>>> v10/contrib_Merge20251106_Try
        Assert.AreEqual(3, payloads.Count());

        var payloadForFred = payloads.First();
        Assert.AreEqual("fred", payloadForFred.Username);
        Assert.AreEqual(1, payloadForFred.Id);
        Assert.IsNull(payloadForFred.PreviousUsername);
<<<<<<< HEAD
=======
        Assert.AreEqual(removed, payloadForFred.Removed);
>>>>>>> v10/contrib_Merge20251106_Try

        var payloadForSally = payloads.Skip(1).First();
        Assert.AreEqual("sally", payloadForSally.Username);
        Assert.AreEqual(2, payloadForSally.Id);
        Assert.IsNull(payloadForSally.PreviousUsername);
<<<<<<< HEAD
=======
        Assert.AreEqual(removed, payloadForSally.Removed);
>>>>>>> v10/contrib_Merge20251106_Try

        var payloadForJane = payloads.Skip(2).First();
        Assert.AreEqual("jane", payloadForJane.Username);
        Assert.AreEqual(3, payloadForJane.Id);
        Assert.AreEqual("janeold", payloadForJane.PreviousUsername);
<<<<<<< HEAD
    }

    private static IMember CreateMember(int id, string name, string username, string email, string? previousUserName = null)
    {
        var memberBuilder = new MemberBuilder()
            .AddMemberType()
                .Done()
            .WithId(id)
            .WithName(name)
            .WithLogin(username, "password")
            .WithEmail(email);

        if (previousUserName != null)
        {
            memberBuilder.AddAdditionalData()
                .WithKeyValue(global::Umbraco.Cms.Core.Constants.Entities.AdditionalDataKeys.MemberPreviousUserName, previousUserName)
                .Done();
        }

        return memberBuilder.Build();
    }
=======
        Assert.AreEqual(removed, payloadForJane.Removed);
    }

    private static IMember CreateMember(int id, Guid key, string name, string username, string email)
        => new MemberBuilder()
            .AddMemberType()
                .Done()
            .WithId(id)
            .WithKey(key)
            .WithName(name)
            .WithLogin(username, "password")
            .WithEmail(email)
            .Build();
>>>>>>> v10/contrib_Merge20251106_Try
}
