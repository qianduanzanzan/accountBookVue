export function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    };
}


export function null2str(data) {
	for (let x in data) {
		if (data[x] === null) { // 如果是null 把直接内容转为 ''
			data[x] = ''
		} else {
			if (Array.isArray(data[x])) { // 是数组遍历数组 递归继续处理
				data[x] = data[x].map(z => {
					return null2str(z)
				})
			}
			if (typeof(data[x]) === 'object') { // 是json 递归继续处理
				data[x] = null2str(data[x])
			}
		}
	}
	return data
}

export function formatImgUrl(url) {
	if(url.startsWith('http://')){
		return url.replace('http://', 'https://');
	}
	return url;
}
