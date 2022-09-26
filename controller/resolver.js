module.exports = (req, res, modelPromise) => {
	const { body } = req;
	modelPromise(body).then(
		success => res.status(200).send(success),
		error => res.status(200).send(error),
	);
};
