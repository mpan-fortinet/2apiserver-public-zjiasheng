provider "aws" {
  region = "us-east-1"  # 你可以根据需要更改 AWS 区域
}

resource "aws_s3_bucket" "public_bucket" {
  bucket = "my-public-bucket-example"  # 更改为你想要的 bucket 名称
  acl    = "public-read"  # 设置 S3 存储桶为公开读取权限
}

resource "aws_s3_bucket_object" "example_object" {
  bucket = aws_s3_bucket.public_bucket.bucket
  key    = "example.txt"  # 可以更改为文件的名称
  content = "This is a publicly accessible file!"
}

resource "aws_s3_bucket_object" "another_example_object" {
  bucket = aws_s3_bucket.public_bucket.bucket
  key    = "another_example.txt"  # 另一个文件
  content = "Another publicly accessible file!"
}

resource "aws_s3_bucket_policy" "public_policy" {
  bucket = aws_s3_bucket.public_bucket.bucket

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action    = "s3:GetObject"
        Effect    = "Allow"
        Resource  = "${aws_s3_bucket.public_bucket.arn}/*"
        Principal = "*"
      }
    ]
  })
}

