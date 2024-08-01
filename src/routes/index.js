import { Router } from "express";
import { authRouter } from "./auth.js";
import { fileRouter } from "./file.js";

const router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Base route
 *     tags:
 *       - Common
 *     responses:
 *       200:
 *         description: Returns a simple "OK" message
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: OK
 */
router.get("/", async (req, res) => {
  res.send("OK");
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check or basic route to ensure the API is running
 *     tags:
 *       - Health Check
 *     responses:
 *       200:
 *         description: Returns a simple "I'm alive!" message
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: OK
 */
router.get("/health", async (req, res) => {
  res.send("I'm alive!");
});

router.use(authRouter);
router.use(fileRouter);

export default router;

/*

 API:
 // Поля id и password, id это номер телефона или email;
 // При удачной регистрации вернуть пару  jwt-токен и refresh токен;

o /signin [POST] - запрос jwt-токена по id и паролю;
o /signin/new_token [POST]  - обновление jwt-токена по refresh токену
o /signup [POST] - регистрация нового пользователя;

o /file/upload [POST] - добавление нового файла в систему и запись параметров файла в базу: название, расширение, MIME type, размер, дата загрузки;
o /file/list [GET]  выводит список файлов и их параметров из базы с использованием пагинации с размером страницы, указанного в передаваемом параметре list_size, по умолчанию 10 записей на страницу, если параметр пустой. Номер страницы указан в параметре page, по умолчанию 1, если не задан;
o /file/delete/:id [DELETE] - удаляет документ из базы и локального хранилища;
o /file/:id [GET] - вывод информации о выбранном файле;
o /file/download/:id [GET] - скачивание конкретного файла;
o /file/update/:id [PUT] - обновление текущего документа на новый в базе и локальном хранилище;

o /info [GET] - возвращает id пользователя;
o /logout [GET] - выйти из системы;


* */
