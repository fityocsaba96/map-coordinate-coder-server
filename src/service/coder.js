class Coder {

    encode(coordinate, accuracy) {
        this.code = '';
        this.currentRectangle = Coder.baseRectangle;
    
        while (this.code.length !== accuracy) {
            if (this.code.length % 2 === 0) {
                this._encodeNext('latitude', coordinate);
            } else {
                this._encodeNext('longitude', coordinate);
            }
        }
        return this.code;
    }

    decode(code) {
        this.currentRectangle = Coder.baseRectangle;
    
        for (let i = 0; i < code.length; i++) {
            if (i % 2 === 0) {
                this._decodeNext('latitude', code.charAt(i));
            } else {
                this._decodeNext('longitude', code.charAt(i));
            }
        }
        return this._getCenter();
    }

    _encodeNext(type, coordinate) {
        const halfCoordinate = this._getHalfCoordinate(type);
        if (this.currentRectangle.bottomLeft[type] + halfCoordinate <= coordinate[type]) {
            this.code += '0';
            this.currentRectangle.bottomLeft[type] += halfCoordinate;
        } else {
            this.code += '1';
            this.currentRectangle.topRight[type] -= halfCoordinate;
        }
    }

    _decodeNext(type, nextCode) {
        const halfCoordinate = this._getHalfCoordinate(type);
        if (nextCode === '0') {
            this.currentRectangle.bottomLeft[type] += halfCoordinate;
        } else {
            this.currentRectangle.topRight[type] -= halfCoordinate;
        }
    }

    _getHalfCoordinate(type) {
        return (this.currentRectangle.topRight[type] - this.currentRectangle.bottomLeft[type]) / 2;
    }
    
    _getCenter() {
        return {
            latitude: this.currentRectangle.bottomLeft.latitude + (this.currentRectangle.topRight.latitude - this.currentRectangle.bottomLeft.latitude) / 2,
            longitude: this.currentRectangle.bottomLeft.longitude + (this.currentRectangle.topRight.longitude - this.currentRectangle.bottomLeft.longitude) / 2
        };
    }
}

Coder.baseRectangle = {
    bottomLeft: { latitude: -90, longitude: -180 },
    topRight: { latitude: 90, longitude: 180 }
};

module.exports = Coder;
