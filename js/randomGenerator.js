var m_w = 123456789;
var m_z = 987654321;
var mask = 0xffffffff;

var seed = function (i) {
	m_w = i;
}

var randomDouble = function () {
	m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
	m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
	var result = ((m_z << 16) + m_w) & mask;
	result /= 4294967296;
	return result + 0.5;
}

var random = function (start,end) {
	return start + randomDouble() * (end-start);
}
