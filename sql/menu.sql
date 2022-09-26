/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '菜单Id 主键',
  `name` char(50) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '菜单名称',
  `path` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '菜单路由',
  `outLink` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '外链',
  `component` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '菜单组件',
  `icon` char(50) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '菜单图标',
  `parentIds` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '菜单上级',
  `menuType` tinyint(4) DEFAULT '1' COMMENT '菜单类型',
  `menuCode` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '权限标识',
  `status` tinyint(1) DEFAULT '1' COMMENT '菜单状态',
  `sort` tinyint(2) DEFAULT '1' COMMENT '排序字段',
  `createTime` datetime DEFAULT NULL COMMENT '创建时间',
  `updateTime` datetime DEFAULT NULL COMMENT '更新时间',
  `affix` tinyint(1) DEFAULT '0' COMMENT '是否固定',
  `cacheable` tinyint(1) DEFAULT '0' COMMENT '是否缓存',
  `hidden` tinyint(1) DEFAULT '0' COMMENT '是否隐藏',
  `tip` char(10) COLLATE utf8mb4_bin DEFAULT 'NULL' COMMENT 'badge提示',
  `badgeNum` tinyint(4) DEFAULT '1' COMMENT 'badge提示数字',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin ROW_FORMAT=DYNAMIC;

INSERT INTO `menu` (`id`, `name`, `path`, `outLink`, `component`, `icon`, `parentIds`, `menuType`, `menuCode`, `status`, `sort`, `createTime`, `updateTime`, `affix`, `cacheable`, `hidden`, `tip`, `badgeNum`) VALUES
(2, '系统管理', '/system', '', NULL, 'Setting', '[null]', 1, NULL, 1, 0, '2022-09-26 14:59:15', '2022-09-26 14:59:15', 0, 0, 0, 'new', 1);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;