       
                -- ngx.say("AES 128 CBC (MD5) Encrypted HEX: ", str.to_hex(encrypted))
                -- ngx.say("AES 128 CBC (MD5) Decrypted: ", aes_128_cbc_md5:decrypt(encrypted))

local red = redis:new()
local aes_128_cbc_md5 = aes:new("AKeyForAES")
red:set_timeout(1000)
local ok, err = red:connect("127.0.0.1", 6379)
if not ok then
    ngx.say("failed to connect: ", err)
    return
end
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
local method = ngx.var.request_method
if method == "POST" then
    ngx.header["Access-Control-Allow-Origin"] = "*"
    ngx.header["Access-Control-Allow-Credentials"] = "true"
    ngx.header["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS"
    ngx.header["Access-Control-Allow-Headers"] = "Content-Type"
    ngx.req.read_body()
    data = ngx.req.get_body_data()
    data = data:gsub("%%40", "@")
    data = split(data,"&")
    local encrypted = aes_128_cbc_md5:encrypt(split(data[3],"=")[2])
    local result, err = red:hmset(split(data[2],"=")[2],"username",split(data[1],"=")[2],"pass",encrypted)
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
end
red:close()


