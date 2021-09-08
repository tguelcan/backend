import mongoosePaginate from "mongoose-paginate-v2";
import { pagination } from "~/config";

export default (mongoose) =>
	new Promise((resolve) => {
		mongoosePaginate.paginate.options = pagination;
		mongoose.plugin(mongoosePaginate);

		resolve(mongoose);
	});
