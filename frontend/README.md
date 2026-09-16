# WORKIVO — Cooperative Service Marketplace Frontend

A pixel-perfect, production-ready implementation of the **WORKIVO** 5-step booking flow built with **React 18 + Vite + Tailwind CSS**, based on the cooperative marketplace design system.

---

## 🚀 Quick Start

1. **Install dependencies** (already completed):
   ```bash
   cd frontend
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173/](http://localhost:5173/) in your browser.

3. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📱 5-Step Booking Flow Architecture

| Step | Design Screen | Component | Key Features & Interactions |
|------|--------------|-----------|-----------------------------|
| **1** | `Select a Verified Service` | `Step1Service.tsx` | • Cooperative Guaranteed badge & 100% Direct Payout widget<br>• Trade category filter tabs (Electrical, Plumbing, Carpentry, Appliance, Painting)<br>• 6 Verified Service Cards with badges (Recommended, Fixed Rate, Hourly, Priority, Standard, Smart Home)<br>• Sticky summary bar with selected service & price<br>• Fair Wage Guarantee banner with 3.2 Hours Saved metric |
| **2** | `Choose your Cooperative Member-Owner` | `Step2Worker.tsx` | • Worker-led model header with 100% Guaranteed Work widget<br>• Sort by pills: Best Match, Nearest Distance, Highest Rating, Earliest Availability<br>• 3 Member-Owner cards: Ravi Kumar (Master Electrician), Priya Sunder (Electrical Engineer), Amitav Ghosh (Senior Wireman)<br>• Artisan details: distance, rating, jobs completed, experience, skills tags, earliest slot<br>• Fair Trade Cooperative Promise banner & sticky worker selection bar |
| **3** | `Select Date & Arrival Window` | `Step3Schedule.tsx` | • October 2025 weekly calendar strip with Optimal day selection<br>• Arrival time slots: Morning (8-10 AM), Midday (10:30-12:30), Afternoon (2-4 PM), Evening (Booked)<br>• Service Location Address card with interactive `AddressModal.tsx`<br>• Notes for Artisan input field<br>• Summary Review card with Co-op Rate Lock, artisan stats, itemized tariff, and ₹0 markup guarantee |
| **4** | `Transparent Escrow Deposit` | `Step4Payment.tsx` | • Sovereign Escrow Protocol: ₹900 total estimate, ₹225 (25%) deposit required today, ₹675 (75%) balance on sign-off<br>• Transparent Wage Split segmented bar: 85% to artisan (₹765), 10% to healthcare & insurance (₹90), 5% to open tech (₹45)<br>• Payment methods: Instant UPI (with live `Verify ID` validation), Credit/Debit Cards, Net Banking<br>• 3 Trust badges (256-bit bank security, 100% peer replacement, zero cancellation penalty)<br>• Booking Recap sidebar with authorization CTA |
| **5** | `Booking & Escrow Confirmed!` | `Step5Confirm.tsx` | • Confetti celebration animation & verified seal<br>• 2x2 Details Grid: Service Reserved, Scheduled Time, Assigned Artisan, Service Address<br>• Escrow Protection Active card with "Funds Secured" badge<br>• Live Tracking & 100% Peer Replacement Guarantee indicators<br>• "View Active Booking in Dashboard" (`DashboardModal.tsx`)<br>• "Download Escrow Receipt (PDF)" (`ReceiptModal.tsx` with print/PDF support)<br>• "Return to Marketplace" reset flow |

---

## ⚡ Supabase Integration Guide

The application comes with a dual-mode Supabase architecture:
- **Offline / Local Mode**: Operates immediately out-of-the-box using local storage persistence and mock data.
- **Supabase Cloud Mode**: Automatically connects and synchronizes whenever Supabase credentials are provided.

### Step 1: Execute SQL Schema
In your [Supabase Dashboard](https://app.supabase.com/) > **SQL Editor**, run the schema located at:
```
frontend/supabase/schema.sql
```
This will create:
- `services`: Service catalog, trade categories, pricing, and badges.
- `workers`: Cooperative member-owners, ratings, guild chapters, and skills.
- `bookings`: Bookings with status, addresses, and schedule slots.
- `escrow_transactions`: 85/10/5 transparent wage splits and transaction statuses.
- Row-Level Security (RLS) policies and seed data.

### Step 2: Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Update with your Supabase project API credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```
The application will automatically detect the credentials in `src/lib/supabase.ts` and sync all bookings directly to your Supabase tables.
