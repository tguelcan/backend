import mongoosePaginate from "mongoose-paginate-v2";
import { pagination } from "~/config";

export default (mongoose) =>
	new Promise((resolve) => {
		/**
		 * Mongoose Pagination
		 * */
		mongoosePaginate.paginate.options = pagination;
		mongoose.plugin(mongoosePaginate);

		// Return mongoose
		resolve(mongoose);
	});
