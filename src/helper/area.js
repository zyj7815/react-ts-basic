const earthRadiusMeters = 6371000.0
const metersPerDegree = (2.0 * Math.PI * earthRadiusMeters) / 360.0
const radiansPerDegree = Math.PI / 180.0
const degreesPerRadian = 180.0 / Math.PI

/**
 * 计算多边形面积
 * @param points [{lng, lat}]
 * @returns {*}
 */
export function calculateArea(points) {
    let pointsArr = []

    points.forEach(point => {
        pointsArr.push([point.lng, point.lat])
    })

    if (points.length > 2) {
        let areaMeters2 = PlanarPolygonAreaMeters2(pointsArr)
        if (areaMeters2 > 1000000.0) {
            areaMeters2 = SphericalPolygonAreaMeters2(pointsArr)
        }
        return areaMeters2
    }
    return 0
}

/*球面多边形面积计算*/
const SphericalPolygonAreaMeters2 = points => {
    let totalAngle = 0
    for (let i = 0; i < points.length; i++) {
        const j = (i + 1) % points.length
        const k = (i + 2) % points.length
        totalAngle += Angle(points[i], points[j], points[k])
    }
    const planarTotalAngle = (points.length - 2) * 180.0
    let sphericalExcess = totalAngle - planarTotalAngle
    if (sphericalExcess > 420.0) {
        totalAngle = points.length * 360.0 - totalAngle
        sphericalExcess = totalAngle - planarTotalAngle
    } else if (sphericalExcess > 300.0 && sphericalExcess < 420.0) {
        sphericalExcess = Math.abs(360.0 - sphericalExcess)
    }
    return sphericalExcess * radiansPerDegree * earthRadiusMeters * earthRadiusMeters
}

/*角度*/
const Angle = (p1, p2, p3) => {
    const bearing21 = Bearing(p2, p1)
    const bearing23 = Bearing(p2, p3)
    let angle = bearing21 - bearing23
    if (angle < 0) {
        angle += 360
    }
    return angle
}

/*方向*/
const Bearing = (from, to) => {
    const lat1 = from[1] * radiansPerDegree
    const lon1 = from[0] * radiansPerDegree
    const lat2 = to[1] * radiansPerDegree
    const lon2 = to[0] * radiansPerDegree
    let angle = -Math.atan2(
        Math.sin(lon1 - lon2) * Math.cos(lat2),
        Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2)
    )
    if (angle < 0) {
        angle += Math.PI * 2.0
    }
    angle = angle * degreesPerRadian
    return angle
}

/*平面多边形面积*/
const PlanarPolygonAreaMeters2 = points => {
    let a = 0
    for (let i = 0; i < points.length; ++i) {
        const j = (i + 1) % points.length
        const xi = points[i][0] * metersPerDegree * Math.cos(points[i][1] * radiansPerDegree)
        const yi = points[i][1] * metersPerDegree
        const xj = points[j][0] * metersPerDegree * Math.cos(points[j][1] * radiansPerDegree)
        const yj = points[j][1] * metersPerDegree
        a += xi * yj - xj * yi
    }
    return Math.abs(a / 2)
}
