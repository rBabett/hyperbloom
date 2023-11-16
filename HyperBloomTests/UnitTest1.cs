using HyperBloom.Models;
using HyperBloom.Models.Entities;
using HyperBloom.Repositories;
using HyperBloom.Services;

namespace HyperBloomTests;

public class Tests
{
    private RegisterModel user;
    
    
    [SetUp]
    public void Setup()
    {
        user = new RegisterModel("Username", "password", "email@address.com");
    }

    [Test]
    public void Test1()
    {
        NeedsRepository needsRepository = new NeedsRepository();
        int needsLength = needsRepository.GetNeedTypes().Count;
        int zero = 0;
        Assert.That(zero, Is.Not.EqualTo(needsLength));
    }
}