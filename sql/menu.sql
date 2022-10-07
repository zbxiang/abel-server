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

 Date: 07/10/2022 21:40:19
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '菜单Id 主键',
  `name` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '菜单名称',
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '菜单路由',
  `outLink` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '外链',
  `component` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '菜单组件',
  `icon` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '菜单图标',
  `parentIds` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '菜单上级',
  `menuType` tinyint NULL DEFAULT 1 COMMENT '菜单类型',
  `menuCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '权限标识',
  `status` tinyint(1) NULL DEFAULT 1 COMMENT '菜单状态',
  `sort` tinyint NULL DEFAULT 1 COMMENT '排序字段',
  `createTime` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `affix` tinyint(1) NULL DEFAULT 0 COMMENT '是否固定',
  `cacheable` tinyint(1) NULL DEFAULT 0 COMMENT '是否缓存',
  `hidden` tinyint(1) NULL DEFAULT 0 COMMENT '是否隐藏',
  `tip` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT 'NULL' COMMENT 'badge提示',
  `badgeNum` tinyint NULL DEFAULT 1 COMMENT 'badge提示数字',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES (2, '系统管理', '/system', '', NULL, 'Setting', '[null]', 1, NULL, 1, 0, '2022-09-26 14:59:15', '2022-09-26 14:59:15', 0, 0, 0, 'new', 1);
INSERT INTO `menu` VALUES (3, '菜单管理', '/system/menu', '', NULL, '', '[2]', 1, NULL, 1, 0, '2022-09-28 09:13:08', '2022-09-28 10:57:35', 0, 0, 0, '', 1);
INSERT INTO `menu` VALUES (4, '角色管理', '/system/role', '', NULL, '', '[2]', 1, NULL, 1, 0, '2022-09-28 09:24:10', '2022-09-28 10:57:56', 0, 0, 0, '', 1);
INSERT INTO `menu` VALUES (5, '用户管理', '/system/user', '', NULL, '', '[2]', 1, NULL, 1, 0, '2022-09-28 09:26:35', '2022-09-28 09:26:35', 0, 0, 0, '', 1);
INSERT INTO `menu` VALUES (6, '部门管理', '/system/dept', '', NULL, '', '[2]', 1, NULL, 1, 0, '2022-09-28 09:28:12', '2022-09-28 10:53:07', 0, 0, 0, '', 1);

SET FOREIGN_KEY_CHECKS = 1;
