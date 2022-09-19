/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `userName` char(100) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '用户名称',
  `nickName` char(50) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '别名',
  `userPwd` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '用户密码',
  `userEmail` char(100) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '用户邮箱',
  `mobile` char(11) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '手机号码',
  `sex` int(11) DEFAULT NULL COMMENT '性别 0：男 1：女 2：其他',
  `deptId` char(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '部门',
  `job` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '岗位',
  `state` int(11) DEFAULT '1' COMMENT '1: 在职 2：离职 3: 试用期',
  `role` int(11) DEFAULT NULL COMMENT '用户角色 0：系统管理员 1：普通用户',
  `roleList` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '系统角色',
  `createTime` datetime DEFAULT NULL COMMENT '创建时间',
  `lastLoginTime` datetime DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`userId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin ROW_FORMAT=DYNAMIC;

INSERT INTO `user` (`userId`, `userName`, `nickName`, `userPwd`, `userEmail`, `mobile`, `sex`, `deptId`, `job`, `state`, `role`, `roleList`, `createTime`, `lastLoginTime`, `remark`) VALUES
(5, 'admin', '张宝湘', '7e5266a172a55f69d1d6e14159d03594', 'admin@qq.com', '13715261163', 0, '[9, 19]', 'web前端开发工程师', 1, 1, '[7]', '2022-08-27 22:36:18', '2022-08-27 22:36:18', '该用户为系统管理员');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;