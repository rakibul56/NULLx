using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

using System;

namespace reviewservice.Models
{
    public class Review
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("CustomerId")]


        /*public DateTime Date { get; set; }*/

        public int CustomerId { get; set; }
        public int ProductId { get; set; }
        public int OrderId { get; set; }
        public string Review_text { get; set; }


    }
}
