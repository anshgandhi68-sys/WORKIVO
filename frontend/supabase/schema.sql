-- WORKIVO Cooperative Service Marketplace Schema
-- Run this in Supabase SQL Editor

-- 1. Services Table
CREATE TABLE IF NOT EXISTS services (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    price INTEGER NOT NULL,
    price_unit TEXT NOT NULL,
    estimated_duration TEXT NOT NULL,
    badge_text TEXT,
    badge_variant TEXT,
    is_recommended BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Cooperative Workers / Member-Owners Table
CREATE TABLE IF NOT EXISTS workers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    guild_partner TEXT NOT NULL,
    rating NUMERIC(2,1) NOT NULL,
    review_count INTEGER NOT NULL,
    jobs_done INTEGER NOT NULL,
    experience_years INTEGER NOT NULL,
    distance_km NUMERIC(3,1) NOT NULL,
    hub_location TEXT NOT NULL,
    skills TEXT[] NOT NULL,
    earliest_slot_text TEXT NOT NULL,
    hourly_rate INTEGER NOT NULL,
    avatar_url TEXT,
    badge_text TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Bookings & Escrow Orders Table
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_code TEXT NOT NULL UNIQUE,
    service_id TEXT REFERENCES services(id),
    service_title TEXT NOT NULL,
    worker_id TEXT REFERENCES workers(id),
    worker_name TEXT NOT NULL,
    scheduled_date DATE NOT NULL,
    scheduled_time TEXT NOT NULL,
    address_line TEXT NOT NULL,
    notes TEXT,
    deposit_amount INTEGER NOT NULL DEFAULT 225,
    total_amount INTEGER NOT NULL DEFAULT 900,
    payment_method TEXT NOT NULL,
    upi_id TEXT,
    status TEXT NOT NULL DEFAULT 'escrow_locked',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Escrow Wage Split Transactions
CREATE TABLE IF NOT EXISTS escrow_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    worker_dividend_amount INTEGER NOT NULL, -- 85%
    guild_healthcare_pool_amount INTEGER NOT NULL, -- 10%
    tech_maintenance_amount INTEGER NOT NULL, -- 5%
    status TEXT NOT NULL DEFAULT 'locked_in_escrow',
    authorized_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE escrow_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read workers" ON workers FOR SELECT USING (true);
CREATE POLICY "Public insert bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read bookings" ON bookings FOR SELECT USING (true);
CREATE POLICY "Public insert escrow" ON escrow_transactions FOR INSERT WITH CHECK (true);

-- Seed Data (Matching WORKIVO UI)
INSERT INTO services (id, title, category, description, price, price_unit, estimated_duration, badge_text, badge_variant, is_recommended)
VALUES
('rewiring-load-balancing', 'Residential Rewiring & Load Balancing', 'electrical', 'Comprehensive diagnostics, includes MCB panel check and circuit safety test.', 450, '/hr', '2-4 hrs estimated', 'Recommended', 'recommended', true),
('ev-wallbox', 'EV Home Wallbox Installation', 'electrical', 'Dedicated 7.2kW or 11kW setup, industrial isolator switch, earthing certification.', 1800, 'fixed package', '3-5 hrs', 'Fixed Rate', 'fixed', false),
('inverter-battery', 'Inverter & Battery Backup Setup', 'electrical', 'Pure sinewave setup & modular rack installation, battery acid checks, heavy load sync.', 600, '/hr', '2-3 hrs', 'Hourly', 'hourly', false),
('emergency-short-circuit', 'Emergency Short-Circuit Isolation', 'electrical', 'Immediate hazard containment, phase separation, and burnt conductor bypass.', 350, 'diagnostic', 'Avg 30 min arrival', 'Priority', 'priority', false),
('ceiling-fan-fitting', 'Ceiling Fan & Light Fixture Fitting', 'electrical', 'Anchor bolt drilling, downrod assembly, balancing blades, and safety hook rigging.', 250, 'fixed per unit', '30-45 mins', 'Standard', 'standard', false),
('smart-home-switchboard', 'Smart Home Switchboard Automation', 'electrical', 'Retrofit micro-relay setup behind plates, neutral wire routing, and Wi-Fi sync.', 850, 'fixed package', '1-2 hrs', 'Smart Home', 'smart', false)
ON CONFLICT (id) DO NOTHING;

INSERT INTO workers (id, name, title, guild_partner, rating, review_count, jobs_done, experience_years, distance_km, hub_location, skills, earliest_slot_text, hourly_rate, badge_text)
VALUES
('ansh-gandhi', 'Ansh Gandhi', 'Master Electrician', 'Guild Equity Partner #408', 4.8, 142, 318, 9, 2.4, 'Bengaluru Hub #408', ARRAY['Inverter', 'Tripping', 'Industrial Relays'], 'Tomorrow 8:00 AM', 450, 'Selected Co-owner'),
('priya-sunder', 'Priya Sunder', 'Electrical Engineer', 'Guild Equity Partner #312', 4.9, 98, 210, 7, 3.8, 'Indiranagar Hub', ARRAY['Phase Balancing', 'Circuit Safety'], 'Tomorrow 9:30 AM', 480, 'Co-owner Member'),
('amitav-ghosh', 'Amitav Ghosh', 'Senior Wireman', 'Inverter & Heavy Load Specialist', 4.7, 118, 415, 12, 5.1, 'Koramangala Hub', ARRAY['Heavy Inverter', 'Copper Conduit'], 'Tomorrow 7:00 AM', 440, 'Senior Co-owner')
ON CONFLICT (id) DO NOTHING;
