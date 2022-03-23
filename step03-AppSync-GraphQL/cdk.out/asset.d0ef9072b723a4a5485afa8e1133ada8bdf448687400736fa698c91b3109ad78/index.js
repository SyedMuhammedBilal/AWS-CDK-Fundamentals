"use strict";
exports.handler = async (event) => {
    if (event.info.fieldName === "hello") {
        return "Hello world";
    }
    else if (event.arguments.msg === "myCustomMsg") {
        return `Hello from ${event.arguments.msg}`;
    }
    else {
        return "Error";
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBU0EsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLEVBQUUsS0FBbUIsRUFBRSxFQUFFO0lBQzVDLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssT0FBTyxFQUFFO1FBQ2xDLE9BQU8sYUFBYSxDQUFBO0tBQ3ZCO1NBQU0sSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsS0FBSyxhQUFhLEVBQUU7UUFDOUMsT0FBTyxjQUFjLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUE7S0FDN0M7U0FBTTtRQUNILE9BQU8sT0FBTyxDQUFBO0tBQ2pCO0FBQ0wsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsidHlwZSBBcHBTeW5jRXZlbnQgPSB7XG4gICAgaW5mbzoge1xuICAgICAgICBmaWVsZE5hbWU6IHN0cmluZ1xuICAgIH1cbiAgICBhcmd1bWVudHM6IHtcbiAgICAgICAgbXNnOiBzdHJpbmdcbiAgICB9XG59XG5cbmV4cG9ydHMuaGFuZGxlciA9IGFzeW5jIChldmVudDogQXBwU3luY0V2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50LmluZm8uZmllbGROYW1lID09PSBcImhlbGxvXCIpIHtcbiAgICAgICAgcmV0dXJuIFwiSGVsbG8gd29ybGRcIlxuICAgIH0gZWxzZSBpZiAoZXZlbnQuYXJndW1lbnRzLm1zZyA9PT0gXCJteUN1c3RvbU1zZ1wiKSB7XG4gICAgICAgIHJldHVybiBgSGVsbG8gZnJvbSAke2V2ZW50LmFyZ3VtZW50cy5tc2d9YFxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBcIkVycm9yXCJcbiAgICB9XG59Il19