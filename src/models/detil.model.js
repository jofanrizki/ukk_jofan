module.exports = mongoose => {
    const schema = mongoose.Schema(
        {  
            acces_date : Date,
            price : Number,
            id_order : {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'order',
				String
			},
            id_room : {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'room',
				String
			},
        },
        { timestamps: true }
    );
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    }
    );
    const Detil = mongoose.model("detil", schema);
    return Detil;
};