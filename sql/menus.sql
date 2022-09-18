/*
 Navicat MySQL Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80029
 Source Host           : localhost:3306
 Source Schema         : abel-manager

 Target Server Type    : MySQL
 Target Server Version : 80029
 File Encoding         : 65001

 Date: 18/09/2022 22:35:32
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for menus
-- ----------------------------
DROP TABLE IF EXISTS `menus`;
CREATE TABLE `menus`  (
  `_id` int NOT NULL AUTO_INCREMENT,
  `parentId` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '父级Id',
  `menuType` int NULL DEFAULT NULL COMMENT '菜单类型',
  `menuName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '菜单名称',
  `menuCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '权限标识',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '路由地址',
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '图标',
  `component` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '组件地址',
  `menuState` int NULL DEFAULT NULL COMMENT '菜单状态',
  `createTime` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `sort` int NOT NULL,
  PRIMARY KEY (`_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menus
-- ----------------------------
INSERT INTO `menus` VALUES (13, '[null]', 1, '菜单管理', '', '/menu', 'menu', 'Menu', 1, '2022-09-04 11:41:46', '2022-09-04 12:26:47', 0);
INSERT INTO `menus` VALUES (14, '[13]', 2, '新增', 'MENU_BTN_ADD', '', '', '', 1, '2022-09-04 12:34:46', '2022-09-04 12:35:19', 0);
INSERT INTO `menus` VALUES (15, '[13]', 2, '编辑', 'MENU_BTN_EDIT', '', '', '', 1, '2022-09-04 12:37:58', '2022-09-04 12:37:58', 1);
INSERT INTO `menus` VALUES (16, '[13]', 2, '删除', 'MENU_BTN_DELETE', '', '', '', 1, '2022-09-04 12:38:31', '2022-09-04 12:38:31', 2);
INSERT INTO `menus` VALUES (17, '[null]', 1, '角色管理', '', '/role', 'role', 'Role', 1, '2022-09-04 15:00:07', '2022-09-04 15:00:07', 1);
INSERT INTO `menus` VALUES (18, '[null]', 1, '部门管理', '', '/dept', 'dept', 'Dept', 1, '2022-09-04 15:01:05', '2022-09-04 15:01:05', 2);
INSERT INTO `menus` VALUES (19, '[null]', 1, '用户管理', '', '/user', 'user', 'User', 1, '2022-09-04 15:02:09', '2022-09-04 15:02:09', 3);

SET FOREIGN_KEY_CHECKS = 1;
