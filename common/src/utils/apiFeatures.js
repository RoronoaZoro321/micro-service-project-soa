/*
Filtering:
Use comparison operators such as gte, gt, lte, and lt in the query string to filter results.
Example: ?amount[gte]=500&amount[lte]=2000 filters results where the amount is between 500 and 2000.

Sorting:
Use the sort parameter to sort results.
Example: ?sort=amount,-issuedAt sorts results by amount in ascending order and issuedAt in descending order.

Limiting Fields:
Use the fields parameter to include or exclude specific fields.
Example: ?fields=acc,amount,accTo includes only the acc, amount, and accTo fields in the results.

Pagination:
Use the page and limit parameters to paginate results.
Example: ?page=2&limit=10 fetches the second page with 10 results per page.
*/

class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        const queryObj = { ...this.queryString };
        const excludedFields = ["page", "sort", "limit", "fields"];
        excludedFields.forEach((el) => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt)\b/g,
            (match) => `$${match}`
        );

        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ");
            this.query = this.query.sort(sortBy);
            // sort('amount')
        } else {
            this.query = this.query.sort("-issuedAt");
        }

        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(",").join(" ");
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select("-__v");
        }

        return this;
    }

    paginate() {
        const page = Number(this.queryString.page) || 1;
        const limit = Number(this.queryString.limit) || 100;
        const skip = (page - 1) * limit;

        // page=2&limit10, 1-10, page 1, 11-20, page 2, 21-30, page 3
        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

module.exports = APIFeatures;
