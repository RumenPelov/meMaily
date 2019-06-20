const mongoose =require('mongoose');

function countVisits() {
    "use strict";
    const Visits = mongoose.model('visits');

	this.visited = "";

    return async (req, res, next) => {
        "use strict";
        const ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
        const date = new Date().toDateString();
        const time = new Date().toTimeString().substring(0, 2);
        const visited = date + " "+ time + "h " + ip;
        if (this.visited!== visited) {

            this.visited = visited;

            Visits.create({  _id: visited }, function (err, doc) {
                if(err) {
                    console.log("Mongoose Error: ", err.message);
                }
                if(doc) {
                    console.log("Inserted document into visits collection.", visited);
                }
            });
        }

        next();
    }
}

module.exports = countVisits;


    // this is just a reminder that visits collection is capped 

/* const createCollection = (req, res, next) => {
    this.db.createCollection("visits", { capped: true, size: 100000});
    next();
} */