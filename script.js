function ipToBinary(ip) {
    return ip.split('.').map(octet => ('00000000' + parseInt(octet, 10).toString(2)).slice(-8)).join('');
}

function binaryToIp(binary) {
    return binary.match(/.{8}/g).map(bin => parseInt(bin, 2)).join('.');
}

function calculateSubnet() {
    let ip = document.getElementById("ip").value;
    let mask = document.getElementById("mask").value;
    
    if (!ip || !mask) {
        alert("Vui lòng nhập IP và Subnet Mask!");
        return;
    }
    
    let ipBinary = ipToBinary(ip);
    let maskBinary = ipToBinary(mask);
    
    let networkBinary = (parseInt(ipBinary, 2) & parseInt(maskBinary, 2)).toString(2).padStart(32, '0');
    let broadcastBinary = (parseInt(networkBinary, 2) | ~parseInt(maskBinary, 2) & 0xFFFFFFFF).toString(2).padStart(32, '0');
    
    let networkID = binaryToIp(networkBinary);
    let broadcastAddress = binaryToIp(broadcastBinary);
    let hostCount = Math.pow(2, 32 - maskBinary.replace(/0/g, '').length) - 2;
    
    let firstHost = binaryToIp((parseInt(networkBinary, 2) + 1).toString(2).padStart(32, '0'));
    let lastHost = binaryToIp((parseInt(broadcastBinary, 2) - 1).toString(2).padStart(32, '0'));
    
    document.getElementById("result").innerHTML = `
        <p>Network ID: ${networkID}</p>
        <p>Broadcast Address: ${broadcastAddress}</p>
        <p>Valid IP Range: ${firstHost} - ${lastHost}</p>
        <p>Usable Hosts: ${hostCount}</p>
    `;
}
