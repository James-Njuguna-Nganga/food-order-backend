"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VandorRoute = void 0;
var express_1 = __importDefault(require("express"));
var controllers_1 = require("../controllers");
var CommonAuth_1 = require("../middlewares/CommonAuth");
var controllers_2 = require("../controllers");
var multer_1 = __importDefault(require("multer"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var router = express_1.default.Router();
exports.VandorRoute = router;
// configure multer
var imageStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        var imagesDir = path_1.default.join(__dirname, '..', 'images');
        if (!fs_1.default.existsSync(imagesDir)) {
            fs_1.default.mkdirSync(imagesDir, { recursive: true });
        }
        cb(null, imagesDir);
    },
    filename: function (req, file, cb) {
        var timestamp = new Date().toISOString().replace(/:/g, '-');
        cb(null, "".concat(timestamp, "_").concat(file.originalname));
    }
});
var images = (0, multer_1.default)({ storage: imageStorage }).array('images', 8);
router.post('/login', controllers_1.VandorLogin);
router.use(CommonAuth_1.Authenticate);
router.get('/profile', controllers_1.GetVandorProfile);
router.patch('/profile', controllers_1.updateVandorProfile);
router.patch('/service', controllers_1.updateVandorService);
router.patch('/coverimage', images, controllers_1.UpdateVandorCoverImage);
router.post("/food", images, controllers_2.AddFood);
router.get("/foods", controllers_2.GetFoods);
router.get('/', function (req, res, next) {
    res.json({
        message: "Hello from Vandor"
    });
});
//# sourceMappingURL=VandorRoute.js.map