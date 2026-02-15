# SwiftShare - Secure P2P File Transfer

A premium, account-less file sharing application that uses QR codes and unique keys for secure peer-to-peer file transfers.

## Features

✨ **Instant P2P Transfer** - Direct WebRTC connections between devices  
🔒 **Secure & Private** - No server storage, end-to-end encrypted  
📱 **Universal Support** - Works on Android, iOS, and Web browsers  
🎨 **Premium Design** - Glassmorphic UI with smooth animations  
⚡ **No Limits** - Share files up to 2GB without restrictions  
🔐 **User Authentication** - Secure login/signup with email or social accounts  
👤 **Personalized Experience** - Track your file sharing history  

## How to Use

### Sending Files

1. Click **"Send Files"**
2. Select your file (up to 2GB)
3. Share the QR code or 6-digit code with the recipient
4. Wait for the recipient to connect
5. File transfers automatically!

### Receiving Files

1. Click **"Receive Files"**
2. Either:
   - **Scan QR Code** - Use your camera to scan the sender's QR
   - **Enter Code** - Type the 6-digit code manually
3. Click **"Connect & Download"**
4. Save the file when transfer completes

### Authentication

The app now includes user authentication for a personalized experience:

**Sign Up:**

1. Enter your name, email, and password
2. Or use Google/GitHub social login
3. Click **"Create Account"**

**Sign In:**

1. Enter your email and password
2. Or use social login
3. Click **"Sign In"**

**Features:**

- Secure localStorage-based session management
- Social authentication (Google, GitHub)
- Personalized welcome message
- Easy logout functionality

> **Note:** This is a demo implementation. For production, integrate with a real authentication service like Firebase, Auth0, or Supabase.

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Development

The app will be available at `http://localhost:3000`

To test file transfers:

1. Open the app in two different browser windows/tabs
2. Or open on two different devices on the same network
3. Send a file from one and receive on the other

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Vanilla CSS with Glassmorphism
- **P2P**: PeerJS (WebRTC wrapper)
- **QR Codes**: qrcode.react, html5-qrcode
- **Icons**: Lucide React

## Project Structure

```
qr-file-share/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles & design system
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/
│   │   ├── AuthPage.tsx     # Login/Signup component
│   │   ├── Sender.tsx       # File sending component
│   │   └── Receiver.tsx     # File receiving component
│   └── hooks/
│       └── usePeer.ts       # PeerJS connection hook
├── package.json
├── next.config.js
└── tsconfig.json
```

## How It Works

1. **Sender** creates a PeerJS connection with a unique 6-digit ID
2. **Sender** generates a QR code containing this ID
3. **Receiver** scans the QR or enters the code manually
4. **Receiver** connects to the sender using the ID
5. **File metadata** is sent first (name, size, type)
6. **File content** is transferred as ArrayBuffer via WebRTC
7. **Receiver** downloads the file automatically

## Browser Compatibility

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 14+
- ✅ Edge 80+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Security

- All transfers use WebRTC's built-in encryption (DTLS/SRTP)
- No files are stored on any server
- Direct peer-to-peer connections
- Unique session IDs generated per transfer

## Troubleshooting

### Connection Issues

- Ensure both devices are on the same network or have internet access
- Check if firewall/antivirus is blocking WebRTC
- Try refreshing both pages

### QR Scanner Not Working

- Grant camera permissions when prompted
- Ensure good lighting for QR code visibility
- Use manual code entry as alternative

### File Transfer Fails

- Check file size (max 2GB)
- Ensure stable internet connection
- Try with a smaller file first

## License

MIT

## Credits

Built with ❤️ using Next.js, PeerJS, and modern web technologies.
