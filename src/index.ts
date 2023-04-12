import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import { env } from 'process';
import { app } from "./app";


try {
	const PORT = env.PORT || 4010;// process.env.PORT пытаемся получить порт из системынх данных

	app.listen(+PORT, () => {
		console.log(`Example app listening on port ${PORT}`);
	});
} catch (error) {
	console.log(error);

}
