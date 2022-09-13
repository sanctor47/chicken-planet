"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var userController = _interopRequireWildcard(require("../controllers/user.controller"));

var _auth = require("../middlewares/auth.middleware");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = _express["default"].Router(); //route to get all users


router.get('', userController.getAllUsers); //route to create a new user

router.post('', userController.newUser);
router.post('/verfiyOTP', userController.verfiyOTP); //route to get a single user by their user id

router.get('/id/:_id', _auth.userAuth, userController.getUser);
router.get('/current', _auth.userAuth, userController.getCurrentUser); //route to signup a new user

router.post('/signup', userController.signup); //route to login a user

router.post('/login', userController.login); //route to update a single user by their user id

router.put('/id/:_id', userController.updateUser); //route to delete a single user by their user id

router["delete"]('/id/:_id', userController.deleteUser); //Mobile App On Boarding

router.post('/newUser', userController.newUser);
var _default = router;
exports["default"] = _default;