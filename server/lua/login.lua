local red = redis:new()
local data
red:set_timeout(1000)
local aes_128_cbc_md5 = aes:new("AKeyForAES")
function split(inputstr, sep)
    if sep == nil then
            sep = "%s"
    end
    local t={}
    for str in string.gmatch(inputstr, "([^"..sep.."]+)") do
            table.insert(t, str)
    end
    return t
end
local ok, err = red:connect("127.0.0.1", 6379)
    if not ok then
        ngx.say("failed to connect: ", err)
        return
    end
ngx.header["Access-Control-Allow-Origin"] = "*"
ngx.header["Access-Control-Allow-Credentials"] = "true"
ngx.header["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS"
ngx.header["Access-Control-Allow-Headers"] = "Content-Type"
local method = ngx.var.request_method
if method == "GET" then
    data = ngx.var.query_string
end
data = data:gsub("%%40", "@")
data = split(data,"&")
local result, err = red:hmget(split(data[1],"=")[2],"pass")
if not result then
    ngx.say("Error: ", err)
    return
else
    if result == 'null' then
        ngx.say("NOPE")
        return
    else
        if aes_128_cbc_md5:decrypt(result[1]) == split(data[2],"=")[2] then
            ngx.say("OK")
            return
        end
        ngx.say("NOPE")
    end
end
red:close()