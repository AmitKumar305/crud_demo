module.exports = (req, res, next) => {
	const {
		files, body: {
			data, id,
		},
	} = req;
	req.body = data ? (
		{ ...JSON.parse(data) }) : { };
	if (id) {
		req.body.id = id;
	}
	if (files && Object.keys(files).length) {
		Object.assign(req.body, { ...files });
	}
	return next();
};
