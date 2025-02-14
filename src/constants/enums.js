
export const LOCATION_TYPE = Object.freeze({
    AIRPORT: 'airport',
    RAILWAY_STATION: 'railway_station',
    DISTRICT: 'district',
    UPAZILA: 'upazila',
    UNION: 'union',
  });
  
  export const ACCOUNT_STATUS = Object.freeze({
    ACTIVE: 'active',
    INACTIVE: 'inactive',
  });
  
  export const ACCOUNT_TYPE = Object.freeze({
    PASSENGER: 'passenger',
    OWNER: 'owner',
    DRIVER: 'driver',
    ADMIN: 'admin',
  });
  
  export const VEHICLE_STATUS = Object.freeze({
    AVAILABLE: 'available',
    IN_RIDE: 'in_ride',
    MAINTENANCE: 'maintenance',
    NEED_APPROVAL: 'need_approval',
  });
  
  export const RIDE_STATUS = Object.freeze({
    OPEN: 'open',
    ACCEPTED: 'accepted',
    CLOSED: 'closed',
    IN_PROGRESS: 'in_progress',
    PASSENGER_PAYMENT_CONFIRMED: 'passenger_payment_confirmed',
    DRIVER_PAYMENT_CONFIRMED: 'driver_payment_confirmed',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
  });
  
  export const CAR_TYPES = Object.freeze({
    SEDAN: 'Sedan',
    SUV: 'SUV',
    HATCHBACK: 'Hatchback',
  });
  
  export const RIDE_TYPES = Object.freeze({
    INSTANT: 'instant',
    SCHEDULED: 'scheduled',
  });
  
  export const TRIP_TYPES = Object.freeze({
    AIRPORT: 'airport',
    INTERCITY: 'intercity',
    HOURLY: 'hourly',
    FIRTI_TRIP: 'firti_trip',
  });
  