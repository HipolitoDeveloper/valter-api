conn = new Mongo();
db = conn.getDB("valter_test")
db.createUser(
{
    user: "valter",
    pwd: "valterpwd",
    roles: [
        {
            role: "readWrite",
            db: "valter_test"
        }
    ]
}
);