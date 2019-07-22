local red = redis:new()
local data
red:set_timeout(1000)
local ok, err = red:connect("127.0.0.1", 6379)
    if not ok then
        ngx.say("failed to connect: ", err)
        return
    end

local method = ngx.var.request_method
if method == "GET" then
    data = ngx.var.query_string
end
local result, err = red:hmget(data,"username")
if not result then
    ngx.say("Error: ", err)
    return
else
    ngx.header["Access-Control-Allow-Origin"] = "*"
    ngx.header["Access-Control-Allow-Credentials"] = "true"
    ngx.header["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS"
    ngx.header["Access-Control-Allow-Headers"] = "Content-Type"
    ngx.say(result) 
end
red:close()