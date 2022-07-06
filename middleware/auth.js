const jwt = require("jsonwebtoken");
const expressJwt = require('express-jwt');

const { User, Role, Project,Department,Project_Department_User, Module, Module_Feature, Feature_Access_Permission, User_Permission, Feature } = require("../models");


exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
  algorithms: ['HS256'],
})

exports.getLogedInUser = async (req, res, next) => {
  
  const user = await User.findByPk(
    req.auth.id, 
    {
      // logging: console.log,
      include: [
      {model: Role}, 
      {
        model: Project_Department_User, 
        include:[{
          model: Department,
          attributes: ['id', 'name'],
          include:[{
            model: Project, 
            attributes: ['id', 'name']
          }]
        }]
      }]
    });
    // console.log(user.Role);
  if (!user || !Role) {
    return res.status(400).json({
      error: "user does not exist"
    });
  }
  user.isAdmin = user.Role.name == 'SUPER ADMIN';
  req.profile = user;
  next();
}


exports.isAdmin = async (req, res, next) => {
  
  if (!req.profile.isAdmin) {
    return res.status(401).json({
      error: "You are not SUPER ADMIN"
    });
  }
  next();
}

exports.isAccessable = async (req, res, next) => {
  
  let url = req.url.split("/");
  url = url[1].toLowerCase();
  let path = req.headers['path'].split("_").join("");
  let newURL = ((req.url.split("?"))[0].split("/"))[1];
  if (!req.headers['feature'] || !req.headers['path']) {
    return res.status(401).json({
      error: "Define headers properly."
    });
  }
  
  if (url.includes(path) || path.includes(url)|| path.includes(newURL)) {
    let rolewithpermission = await Role.findOne({
      // logging: console.log,
      where: {
        id: req.profile.role_id,
        // '$Feature_Access_Permissions.Feature.Modules.Module_Feature.path$': req.headers["path"] ? req.headers["path"] : ""
      }, 
      raw: true,
      include: [{
        model: Feature_Access_Permission, include: [
          {
            model: Feature, include: [
              { model: Module, attributes: ['id', 'name'] }
            ], attributes: ['id', 'name']
          }
        ]
      }]
    });
    
    if (rolewithpermission) {
      next();
    } else {
      return res.status(401).json({
        error: "You are Not Authorized For Page isAccessabletrue" 
      });
    }   
  } else {
    return res.status(401).json({
      error: "You are Not Authorized For Page isAccessablefalse"
    });
  }
}

exports.hasPermissionCreate = async (req, res, next) => {
  
  try {

    const permission = await Feature_Access_Permission.findOne({
      // logging: console.log,
      where: {
        role_id: req.profile.role_id,
        '$name$': req.headers["feature"],
        '$create$': true,
      }, include: [{
        model: Feature, attributes: ['id', 'name']
      }]
    });
    
    if (permission == null) {
      res.status(401).json({
        message: "You are Not Authorized For Page hasPermissionCreate true",
      });
    } else {
      next();
    }

  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error in Middleware",
      error: error
    });
  }
}

exports.hasPermissionUpdate = async (req, res, next) => {
  
  try {

    const permission = await Feature_Access_Permission.findOne({
      where: {
        role_id: req.profile.role_id,
        '$name$': req.headers["feature"],
        '$update$': true,
      }, include: [{
        model: Feature, attributes: ['id', 'name']
      }]
    });
    if (permission == null) {
      res.status(401).json({
        message: "You are Not Authorized For Page hasPermissionUpdate true",
      });
    } else {
      next();
    }


  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error in Middleware",
      error: error
    });
  }
}

exports.hasPermissionRead = async (req, res, next) => {
  
  try {
    const permission = await Feature_Access_Permission.findOne({
      where: {
        role_id: req.profile.role_id,
        '$name$': req.headers['feature'],
        '$read$': true,
      }, include: [{
        model: Feature, attributes: ['id', 'name']
      }]
    });

    if (permission == null) {
      if (req.params.userId && req.params.userId == req.profile.id) {
        next();
      } else {
        res.status(401).json({
          message: "You dont have Permission To access"
        });
      }
    } else {
      next();
    }
  }
  catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error in Middleware",
      error: error
    });
  }
}

exports.hasPermissionDelete = async (req, res, next) => {
 
  try {
    const permission = await Feature_Access_Permission.findOne({
      where: {
        role_id: req.profile.role_id,
        '$name$': req.headers["feature"],
        '$delete$': true,
      }, include: [{
        model: Feature, attributes: ['id', 'name']
      }]
    });
    if (permission == null) {
      res.status(401).json({
        message: "You are Not Authorized For Page hasPermissionDelete true",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error in Middleware",
      error: error
    });
  }
}

exports.hasPermission = async (req, res, next) => {
  
  try {
    const permission = await Feature_Access_Permission.findOne({
      where: {
        role_id: req.profile.role_id,
        '$name$': req.headers["feature"],
        '$create$': true
      },
      include: [
        { model: Feature, attributes: ['id', 'name'] }
      ]
    })

    return res.status(401).json({
      permission: permission
    });

  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error in middleware",
      error: error
    });
  }
}