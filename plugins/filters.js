/* 

router.route('/beersFilter')
    .get(async(req, res) => {
			const qType = req.query.type
			const qStyle = req.query.style
			const qGrad = req.query.grad
			const qCountry = req.query.country
			
			const query = buildQuery(qType, qStyle, qGrad, qCountry)
			console.info("Query: ", query);
			let beerList = await Cerveza.find(query).exec();
        res.json(beerList);
    })
    function gradToRange(value) {
			switch (value) {
				case 1: return {$lt:6};
				case 2: return {$gte:6, $lt:9};
				case 3: return {$gte:9};
				default: {};
			}
		}

		function buildQuery(type, style, grad, country) {
			let query = {}
			if (type) query.type = type
			if (style) query.style = style
			if (grad) query.grad = gradToRange(grad)
			if (country) query.country = country
      return query     		
    }

    				/* {
        'type': `${qType}`,
        'style': qStyle,
        'grad': gradToRange(qGrad),
				'country': qCountry
			})*/ 