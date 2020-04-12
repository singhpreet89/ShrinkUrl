module.exports = {
    handleFilters : (req) => {
        // SANITIZE the INPUTS here, make sure that the filter is a string and escaped strings 
        // and 
        // At the Moment the application only supports "Clicks" as FILTER
        // We can also add the filters for created_at and clicked_at
        const filters = {};
        const clicksObject = {};

        if(req.query.filter === "clicks") {
            if(parseInt(req.query.gte) && parseInt(req.query.lte)) {
                clicksObject['$gte'] = parseInt(req.query.gte);
                clicksObject['$lte'] = parseInt(req.query.lte);
                filters['clicks'] = clicksObject;
            } else if(parseInt(req.query.gte) && parseInt(req.query.lt)) {
                clicksObject['$gte'] = parseInt(req.query.gte);
                clicksObject['$lt'] = parseInt(req.query.lt);
                filters['clicks'] = clicksObject;
            } else if(parseInt(req.query.gt) && parseInt(req.query.lte)) {
                console.log("3rd");
                clicksObject['$gt'] = parseInt(req.query.gt);
                clicksObject['$lte'] = parseInt(req.query.lte);
                filters['clicks'] = clicksObject;
            } else if(parseInt(req.query.gt) && parseInt(req.query.lt)) {
                clicksObject['$gt'] = parseInt(req.query.gt);
                clicksObject['$lt'] = parseInt(req.query.lt);
                filters['clicks'] = clicksObject;
            } else if(parseInt(req.query.gte)) {
                clicksObject['$gte'] = parseInt(req.query.gte);
                filters['clicks'] = clicksObject;
            } else if(parseInt(req.query.lte)) {
                clicksObject['$lte'] = parseInt(req.query.lte);
                filters['clicks'] = clicksObject;
            } else if(parseInt(req.query.gt)) {
                clicksObject['$gt'] = parseInt(req.query.gt);
                filters['clicks'] = clicksObject;
            } else if(parseInt(req.query.lt)) {
                clicksObject['$lt'] = parseInt(req.query.lt);
                filters['clicks'] = clicksObject;
            } else if(parseInt(req.query.ne)) {
                clicksObject['$ne'] = parseInt(req.query.ne);
                filters['clicks'] = clicksObject;
            } else if(parseInt(req.query.eq)) {
                filters['clicks'] = parseInt(req.query.eq);
            }
        }

        return filters;
    },

    handleProjections : (req) => {
        // SANITIZE inputs here and allow commas
        const projections = { __v : 0 };
        
        if(req.query.proj_ex) {
            const projectionsArray = req.query.proj_ex.split(',');

            // Returning Projections object 
            return projectionsArray.reduce((a,b) => ({...a, [b] : 0}),{});   
        }
        return projections;
    },

    handleOptions : (req) => {
        // SANITIZE the INPUTS here, make sure that the skip, limit are integers / sort_by, order_by 
        // are strings and escaped strings
        const options = {
            skip : parseInt(req.query.skip) >= 0 ? parseInt(req.query.skip) : 0,
            limit : parseInt(req.query.limit) >= 0 ? parseInt(req.query.limit) : 0,
        }
    
        const sortOption = {};
        if(req.query.sort_by && req.query.order_by){
            sortOption[req.query.sort_by] = req.query.order_by === 'desc' ? -1 : 1
        } else if(req.query.sort_by) {
            sortOption[req.query.sort_by] = 1
        }
        options.sort = sortOption;
    
        return options;
    }
}

