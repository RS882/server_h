
import { app } from "./app";



const PORT = process.env.PORT || 4010;// process.env.PORT пытаемся получить порт из системынх данных

app.listen(+PORT, () => {



	console.log(`Example app listening on port ${PORT}`);
}); 