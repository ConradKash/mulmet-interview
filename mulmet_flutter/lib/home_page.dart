import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'widgets/date_selector.dart';
import 'widgets/task_card.dart';

class MyHomePage extends StatefulWidget {
  static MaterialPageRoute route() =>
      MaterialPageRoute(builder: (context) => const MyHomePage());

  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('My Tasks'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () async {
              await FirebaseAuth.instance.signOut();
            },
          ),
        ],
      ),
      body: Center(
        child: Column(
          children: [
            const DateSelector(),
            StreamBuilder(
              stream: FirebaseFirestore.instance
                  .collection("tasks")
                  .where(
                    'owner',
                    isEqualTo: FirebaseAuth.instance.currentUser!.email,
                  )
                  .snapshots(),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Center(child: CircularProgressIndicator());
                }
                if (!snapshot.hasData) {
                  return const Text('No data here :(');
                }

                return Expanded(
                  child: ListView.builder(
                    itemCount: snapshot.data!.docs.length,
                    itemBuilder: (context, index) {
                      return Row(
                        children: [
                          Expanded(
                            child: TaskCard(
                              headerText: snapshot.data!.docs[index]
                                  .data()['title'],
                              descriptionText: snapshot.data!.docs[index]
                                  .data()['description'],
                              scheduledDate:
                                  (snapshot.data!.docs[index].data()['date']
                                          as Timestamp)
                                      .toDate()
                                      .toString(),
                            ),
                          ),
                          IconButton(
                            icon: Icon(
                              snapshot.data!.docs[index].data()['State'] == true
                                  ? Icons.check_circle
                                  : Icons.radio_button_unchecked,
                              color:
                                  snapshot.data!.docs[index].data()['State'] ==
                                      true
                                  ? Colors.green
                                  : Colors.grey,
                            ),
                            onPressed: () async {
                              final docId = snapshot.data!.docs[index].id;
                              final currentState =
                                  snapshot.data!.docs[index].data()['State'] ==
                                  true;
                              await FirebaseFirestore.instance
                                  .collection("tasks")
                                  .doc(docId)
                                  .update({'State': !currentState});
                            },
                          ),
                        ],
                      );
                    },
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
