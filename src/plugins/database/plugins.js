import mongoosePaginate from "mongoose-paginate-v2";
import { pagination } from "~/config";

/**
 * Bind mongoose plugins here
 * @return resolve promise mongoose
 * */
export default (mongoose) =>
	new Promise((resolve) => {
		/**
		 * Mongoose Pagination
		 * */
		mongoosePaginate.paginate.options = pagination;
		mongoose.plugin(mongoosePaginate);

		/**
		 * More mongoose plugins
		 * ...
		 * */

		resolve(mongoose);
	});
