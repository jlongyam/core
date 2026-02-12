function type(input) {
	const proto = Object.prototype.toString.call(input)
	return proto.split(' ')[1].replace(']','')
}

export default type;