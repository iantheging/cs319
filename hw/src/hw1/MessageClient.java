package hw1;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.Scanner;

public class MessageClient {

    Socket serverSocket;
    String serverHostName = "localhost";
    int serverPortNumber = 4444;
    ServerListener serverListener;
    String name;
    Scanner in = new Scanner(System.in);

    MessageClient() {

        // User Information
        System.out.println("Enter username: ");
        name = in.nextLine();
        System.out.println("Enter access code: ");
        int accessCode = in.nextInt();

        // loop till correct code is entered
        while (accessCode != 55) {
            System.out.println("Access denied, try again: ");
            accessCode = in.nextInt();
        }

        System.out.println("Access granted, connecting to server...");

        try {
            serverSocket = new Socket(serverHostName, serverPortNumber);
        } catch (UnknownHostException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        serverListener = new ServerListener(this, serverSocket);
        new Thread(serverListener).start();

        PrintWriter out;
        try {
            out = new PrintWriter(new BufferedOutputStream(serverSocket.getOutputStream()));

            while (true) {
                String message = name + " " + in.nextLine();

                // make sure message has contents
                if (!message.equals(name)) {
                    out.println(message);
                    out.flush();
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void handleMessage(String usr, String message) {
//        switch (usr) {
//            case "all":
//                System.out.println(message);
//                break;
//
//            // check that it is a message from a different user
//            case name:
//                break;
//
//            default:
//                System.out.println(usr + ": " + message);
//        }

        if (usr.equals("all")) {
            System.out.println(message);
        } else if (!usr.equals(name)) {
            System.out.println(usr + "> " + message);
        }
    }

    public static void main(String[] args) {
        MessageClient messageClient = new MessageClient();
    }
}

class ServerListener implements Runnable {
    MessageClient messageClient;
    Scanner in;

    ServerListener(MessageClient messageClient, Socket socket) {
        try {
            this.messageClient = messageClient;
            in = new Scanner(new BufferedInputStream(socket.getInputStream()));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void run() {
        while (true) {
            String usr = in.next();
            String s = in.nextLine();
            messageClient.handleMessage(usr, s);
        }
    }
}
