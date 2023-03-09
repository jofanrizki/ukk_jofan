module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            num_order : Number,
            order_name : String,
            order_email : String,
            order_date : { type : Date, default: Date.now },
            check_in : Date,
            check_out : Date,
            guest_name : String,
            room_ordered : Number,
            status : {type: String, enum : ['baru','check_in','check_out'], default: 'baru'},
            id_type : String,
            id_user : String
            
        },
        { timestamps: true }
    )
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    }
    );
    const Order = mongoose.model("order", schema);
    return Order;

};