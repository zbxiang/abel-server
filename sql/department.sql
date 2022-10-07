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

 Date: 07/10/2022 21:40:01
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for department
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `parentIds` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `updateTime` datetime NULL DEFAULT NULL,
  `createTime` datetime NULL DEFAULT NULL,
  `sort` tinyint NULL DEFAULT 0 COMMENT '排序字段',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of department
-- ----------------------------
INSERT INTO `department` VALUES (1, '技术部', 'dp_code_technology', '[null]', '2022-09-29 11:34:08', '2022-09-29 09:52:39', 0);
INSERT INTO `department` VALUES (3, '技术1部', 'dp_code_technology_1', '[1]', '2022-09-29 10:31:11', '2022-09-29 10:31:11', 0);
INSERT INTO `department` VALUES (4, '技术2部', 'dp_code_technology_2', '[1]', '2022-09-29 10:32:09', '2022-09-29 10:32:09', 0);

SET FOREIGN_KEY_CHECKS = 1;
