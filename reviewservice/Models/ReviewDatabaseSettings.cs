namespace reviewservices.Models
{
    public class ReviewDatabaseSettings : IReviewDatabaseSettings
    {
        public string ReviewCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IReviewDatabaseSettings
    {
        string ReviewCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}