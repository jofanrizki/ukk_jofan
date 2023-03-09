module.exports = (mongoose) => {
	const schema = mongoose.Schema(
		{
			number_room: Number,
			status: Boolean,
			id_type: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'TypeKamar',
				String
			}
		},
		{ timestamps: true }
	);
	schema.method('toJSON', function() {
		const { __v, _id, ...object } = this.toObject();
		object.id = _id;
		return object;
	});
	const Room = mongoose.model('room', schema);
	return Room;
};
