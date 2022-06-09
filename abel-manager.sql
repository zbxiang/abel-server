/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50718
Source Host           : localhost:3306
Source Database       : abel-manager

Target Server Type    : MYSQL
Target Server Version : 50718
File Encoding         : 65001

Date: 2022-06-09 10:24:09
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for menus
-- ----------------------------
DROP TABLE IF EXISTS `menus`;
CREATE TABLE `menus` (
  `menuType` int(11) DEFAULT NULL COMMENT '菜单类型',
  `menuName` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '菜单名称',
  `menuCode` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '权限标识',
  `path` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '路由地址',
  `icon` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '图标',
  `components` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '组件地址',
  `menuState` int(11) DEFAULT NULL COMMENT '菜单状态',
  `cteateTime` date DEFAULT NULL COMMENT '创建时间',
  `updateTime` date DEFAULT NULL COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of menus
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `userName` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '用户名称',
  `userPwd` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '用户密码',
  `userEmail` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '用户邮箱',
  `mobile` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '手机号码',
  `sex` int(11) DEFAULT NULL COMMENT '性别',
  `deptId` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '部门',
  `job` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '岗位',
  `state` int(11) DEFAULT '1' COMMENT '1: 在职 2：离职 3: 试用期',
  `role` int(11) DEFAULT NULL COMMENT '用户角色 0：系统管理员 1：普通用户',
  `roleList` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '系统角色',
  `createTime` datetime DEFAULT NULL COMMENT '创建时间',
  `updateTime` date DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`userId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin', 'fe45755101c511db229f7c4a30aa6554', null, null, null, null, null, '1', null, null, null, null, null);
