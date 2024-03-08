const moment = require('moment-timezone');

export function dateTime(): string {
  const fecha = moment().tz('America/Bogota').toISOString();
  return fecha;
}
