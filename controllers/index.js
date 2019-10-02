const nextnode              = require('next-nodecms');
const isNil                 = require('lodash/isNil');

const {
    newsPerPage: newsPerPageConfig,
} = require(`${global.__base}/config`);


class ModelController {

    constructor(list, name) {
        this.list = list;
    	this.model = list.model;
        this.modelName = name;
    }

    updateList(model, data, options) {
        const self = this;
        return new Promise(resolve => {
            self.list.updateItem(model, data, options, err => {
                resolve(err);
            }); 
        });
    }

    getSortingFields() {
        return {
            first: 'ordering',
            second: 'updatedAt',
        };
    }

    getLookUp(from, localField, foreignField, as) {
        return {
            from,
            localField,
            foreignField,
            as: as || localField,
        };
    }

    /*
    ** get multilingual value from the field
    ** use the default language instead if it is not being to define
    ** @param addon to be added to if conditiions
    ** Terry Chan
    ** 14/12/2018
    */
    multilingualPipeline({ language }, field, type='string', addon = []) {
        var and = [
            { $ne: [`$${field}.${language}`, undefined] },
            { $ne: [`$${field}.${language}`, null] },
            { $ifNull: [`$${field}.${language}`, false] },
        ];
        
        switch (type) {
            case 'string': 
                and = [
                    ...and,
                    ...[{ $ne: [`$${field}.${language}`, ''] }],
                ];
                break;
            case 'array': 
                and = [
                    ...and,
                    ...[{ $gt: [ { $size: `$${field}.${language}` } , 0] }],
                ];
                break;
            default:
                and = [ ...and ];
        }

        return {
            $cond: {
                if: { 
                    $and: [
                        ...and,
                        ...addon,
                    ],
                },
                then: `$${field}.${language}`, else: `$${field}.${nextnode.get('locale')}`,
            },
        };
    }

    /*
    ** Dynamic identify the paging for the pipelines if needed
    ** if provide full query, then ingore the paging function
    ** Terry Chan
    ** 16/12/2018
    */
    makePipelinePagaing(req) {
        if ((req.query.page || req.query.perPage) && !req.query.full) {
            const { skip, limit } = this.getPaging(req);
            return [
                {
                    $skip: skip,
                },
                {
                    $limit: limit,
                }
            ];
        }
        return [];
    }

    getPaging(req) {
        var { query: { page = 0, limit = newsPerPageConfig } } = req;
        if (isNil(page)) {
            page = 0;
        } else {
            page -= 1;  // used for offset
        }
        if (isNil(limit)) {
            limit = newsPerPageConfig;
        }
        page = Math.max(0, page);
        limit = Math.max(newsPerPageConfig, limit);

        return {
            page,
            limit: limit,
            skip: page * limit,
        };
    }
}

module.exports = ModelController;
