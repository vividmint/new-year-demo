# 本地如何开发

启动nginx，对域名解析到解决跨域问题

```sudo nginx```

nginx里主要对xxx.com做了一些规则解析
mac上nginx的配置文件的路径是:```/usr/local/etc/nginx/servers/xxx.com.conf```
主要配置如下：
```
server {
    listen 80;
    server_name xxx.com local.dev;
    location /v4/ {
        proxy_pass http://127.0.0.1:9002/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    location / {
        proxy_pass http://115.159.97.90;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    location /beta2 {
	     alias /Users/vividmint/project/inbox/xxx/dist;
    }
}
```
```npm run http```
# 服务器如何部署
