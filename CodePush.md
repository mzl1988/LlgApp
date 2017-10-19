# CodePush部署
http://microsoft.github.io/code-push/

## 前提条件
### 1. 安装CodePush
如已经安装，不需要再安装
```
$ npm install -g code-push-cli
```

### 2. 创建CodePush项目
创建CodePush Projects, 并记下deployment key
```
$ code-push app add LlgApp-iOS ios cordova
$ code-push app add LlgApp-Android android cordova
```

----

## CodePush - 自动部署最新代码到服务器
### 1. 登录CodePush
```
$ code-push login
```

### 2. 执行命令
```
$ ./codePush.sh
```
---

## CodePush - 手动部署最新代码到服务器

### 1. 登录CodePush
```
$ code-push login
```

### 2. Build App
以下二选一执行。
```
$ ionic cordova build ios --prod
$ ionic cordova build android --prod
```

### 3. 提交代码到CodePush的Production上
```
$ code-push release-cordova LlgApp-iOS ios --deploymentName Production --mandatory true
$ code-push release-cordova LlgApp-Android android --deploymentName Production --mandatory true
```

---

## 常用命令

### 1. 查看部署信息
```
$ code-push deployment ls LlgApp-iOS -k
$ code-push deployment ls LlgApp-Android -k

```

### 1. 查看部署历史记录
```
$ code-push deployment history LlgApp-iOS Production
$ code-push deployment history LlgApp-Android Production

```




