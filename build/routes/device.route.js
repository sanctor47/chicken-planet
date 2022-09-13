"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var deviceController = _interopRequireWildcard(require("../controllers/device.controller"));

var _auth = require("../middlewares/auth.middleware");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = _express["default"].Router(); //route to get all devices


router.get('', deviceController.getAllDevices); //route to create a new device

router.post('', deviceController.newDevice); //route to get a single device by their device id

router.get('/id/:_id', _auth.deviceAuth, deviceController.getDevice); //route to update a single device by their device id

router.put('/id/:_id', deviceController.updateDevice); //route to delete a single device by their device id

router["delete"]('/id/:_id', deviceController.deleteDevice);
router.post('/fakeLogin', function (req, res, next) {
  console.log(req.body);
  res.status(200).json({
    data: '38239gf3298f923g0f32g823'
  });
});
router.post('/fakeSync', function (req, res, next) {
  console.log(req.body);
  res.status(200).json({
    data: 'Ok'
  });
});
router.post('/fakeReading', function (req, res, next) {
  console.log(req.body);
  res.status(200).json({
    data: 'Ok'
  });
});
var _default = router;
exports["default"] = _default;