provider "aws" {
  region = "us-west-2"  # 替换为你需要的 AWS 区域
}

resource "aws_db_instance" "example" {
  identifier           = "example-db-instance"
  engine               = "mysql"
  engine_version       = "5.7"
  instance_class       = "db.t2.micro"
  allocated_storage    = 20
  storage_type         = "gp2"
  username             = "admin"
  password             = "yourpassword"  # 替换为你的数据库密码
  parameter_group_name = "default.mysql5.7"
  skip_final_snapshot  = true

  # 关闭日志功能
  enabled_cloudwatch_logs_exports = []  # 设置为空列表以关闭所有日志导出
}
