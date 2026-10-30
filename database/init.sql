
-- DRIVER TABLE
CREATE TABLE IF NOT EXISTS drivers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    vehicle_number VARCHAR(30) UNIQUE NOT NULL,
    vehicle_capacity NUMERIC(8,2) NOT NULL,
    available BOOLEAN DEFAULT TRUE,
    current_area VARCHAR(80)
);

-- DELIVERY ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    area VARCHAR(80) NOT NULL,
    package_weight NUMERIC(8,2) NOT NULL,
    priority VARCHAR(20) DEFAULT 'Normal',
    status VARCHAR(30) DEFAULT 'Pending',
    driver_id INTEGER REFERENCES drivers(id)
        ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- SAMPLE DRIVER DATA
INSERT INTO drivers
(name, phone, vehicle_number, vehicle_capacity, current_area)
VALUES
('Arun Kumar', '9000000001', 'TN01AB1234', 25, 'Central'),
('Priya S', '9000000002', 'TN02CD5678', 15, 'Adyar'),
('Karthik R', '9000000003', 'TN03EF9012', 30, 'Velachery')
ON CONFLICT (vehicle_number) DO NOTHING;

-- SAMPLE DELIVERY ORDERS
INSERT INTO orders
(customer_name, address, area, package_weight, priority, status)
VALUES
('Meena', '12 Lake View Road', 'Adyar', 2.5, 'High', 'Pending'),
('Rahul', '45 North Street', 'Anna Nagar', 4, 'Normal', 'In Transit');
